/* This solution shows the total unique companies in a field */
db.companies.aggregate( [
    { $match: { "relationships.person.permalink": "eric-di-benedetto" } },
	{ $unwind: "$relationships"  },
	{ $match: { "relationships.person.permalink": "eric-di-benedetto" } },
    { $group: {
        _id: "$relationships.person.permalink",
		companies: {$addToSet: "$name"},
		totalCompanies: {$sum: 1}
    } },
	{ $project: { _id: 1 , companies: 1, totaUniqueCompanies: { $size: "$companies"}} },
] ).pretty()
