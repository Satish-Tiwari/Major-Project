class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //    //! Search By Keyword...
  searchFeature() {
    const keyword = this.queryStr.keyword
      ? {
          description: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  //  //! Filter by Category...
  filterCategory() {
    const categoryName = this.queryStr.category
      ? {
          category: {
            $regex: this.queryStr.category,
          },
        }
      : {};
    this.query = this.query.find({ ...categoryName });
    return this;
  }

  //  //! Pagination...
  pagination(resultPerPage){
    const page = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (page-1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeature;
