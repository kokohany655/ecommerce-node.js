export class ApiFeature {
    mongooseQuery:any
    queryString:any
    pagination:any
    public constructor(mongooseQuery:any , queryString:any){
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }
    filter(){
        //filtering 
        const queryObject = {...this.queryString}
        const excludesFields = ["page" , "limit" , "sort" , "fields"]
        excludesFields.forEach(e=>{delete queryObject[e]})

        let queryStr = JSON.stringify(queryObject)

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , (match)=>`$${match}`)

        console.log(queryStr);
        console.log(JSON.parse(queryStr));
        
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr))

        return this
    }

    sort(){
        //sorting
        if(this.queryString.sort){
            const sortBy = String(this.queryString.sort).split(',').join(' ')
            this.mongooseQuery = this.mongooseQuery.sort(sortBy)
        }else{
            this.mongooseQuery = this.mongooseQuery.sort('-createAt')
        }

        return this
    }

    selectFields(){
        //select fields you want 
        if(this.queryString.fields){
            console.log(this.queryString.fields)
            const fields = String(this.queryString.fields).split(',').join(' ')
            console.log(fields)
            this.mongooseQuery = this.mongooseQuery.select(fields)
        }else{
            this.mongooseQuery = this.mongooseQuery.select('-__v')
        }

        return this
    }

    search(modelName?:string) {
        if (this.queryString.keyword) {
            console.log(this.queryString.keyword)
          let query:any = {};
          if (modelName === 'Product') {
            query.$or = [
              { title: { $regex: this.queryString.keyword, $options: 'i' } },
              { description: { $regex: this.queryString.keyword, $options: 'i' } },
            ];
          } else {
            query = { name: { $regex: this.queryString.keyword, $options: 'i' } };
          }
    
          this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;
      }

    paginate(countDecument:number){
        //paginate
        const page = Number(this.queryString?.page) || 1
        const limit = Number(this.queryString?.limit)|| 5
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const pagination:{
            currentPage?:number,
            limit?:number,
            numberOfPage?:number,
            next?:number,
            prev?:number
        } = {}

        pagination.currentPage = page
        pagination.limit = limit
        pagination.numberOfPage = Math.ceil(countDecument / limit)

        if(endIndex < countDecument){
            pagination.next = page + 1
        }
        if(startIndex > 0){
            pagination.prev = page - 1
        }

        this.pagination = pagination

        this.mongooseQuery = this.mongooseQuery.skip(startIndex).limit(limit)

        return this 
    }
}
