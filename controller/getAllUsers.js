
const userModel = require("../models/user");


async function getAllUsers(req, res) {
  let {
    pageNo,
    limitNo,
    filter = "createdAt",
    order = "-1",
    fromDate,
    toDate,
    search,
    access
  } = req.query;
  pageNo = pageNo ? +pageNo : 1;
  limitNo = limitNo ? +limitNo : 20;

  let sort = { $sort: {} };
  let query = {};

  if (filter) {
    if (!order) order = 1;
    sort["$sort"][filter] = parseInt(order);
  }

  if (fromDate && toDate) {
    fromDate = new Date(fromDate) || new Date(null);
    toDate = new Date(toDate) || new Date(null);

    query["createdAt"] = {
      $gte: fromDate,
      $lte: new Date(toDate.getTime() + 86399999)
    };
  }
  if (search) {
    search = search.trim();
    query["$text"] = {
      $search: search
    };
  }

  if(access){
    query['status.access'] = normalizeStatusField(access)
  }

  try {
    let users = await userModel.aggregate([
      {
        $match: query
      },
      sort,
      {
        $project: {
          first_name: 1,
          last_name: 1,
          email: 1,
          phone: 1,
          status: {
            access: 1
          },
          createdAt: 1,
          client_id: 1
        }
      },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            {
              $addFields: {
                page: pageNo,
                limit: limitNo,
                pages: { $ceil: { $divide: ["$total", limitNo] } }
              }
            }
          ],
          data: [{ $skip: pageNo * limitNo - limitNo }, { $limit: limitNo }]
        }
      },
      {
        $addFields: {
          metadata: { $arrayElemAt: ["$metadata", 0] }
        }
      }
    ])
    return res.status(200).send({
      status_code: 200,
      data: users
    });
  } catch (error) {
    res.status(400).json({message: error})
  }
}


function normalizeStatusField(access){
  access = access.split('')
  access[0] = access[0].toUpperCase()
  return access.join('')
}

module.exports = getAllUsers