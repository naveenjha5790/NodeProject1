const asyncWrap = require('../middleware/async');
const work=require('../model/work');
const cricAll=asyncWrap(async (req, res,next)=>{
    const tasks=await work.find({});
    res.status(200).json({tasks,nbHits:tasks.length})
})

const cricAllq= asyncWrap(async (req,res,next)=>{
  const {numericFilters,sort,fields,name,country,runs,batAvg,bowlAvg,highestScore,tests,wickets}=req.query;
  const queryObject={}
  if (name){
    queryObject.name=name;
  }if (country){
    queryObject.country=country;
  }if (runs){
    queryObject.runs=runs;
  }if (batAvg){
    queryObject.batAvg=batAvg;
  }if (bowlAvg){
    queryObject.bowlAvg=bowlAvg;
  }if (highestScore){
    queryObject.highestScore=highestScore;
  }if (tests){
    queryObject.tests=tests;
  }if (wickets){
    queryObject.wickets=wickets;
  }if (numericFilters){
    const operatorMap={
        '>':'$gt',
        '>=':'$gte',
        '<':'$lt',
        '<=':'$lte',
        '=':'$eq',
    }
    const regEx=/\b(<|>|<=|>=|=)\b/g;
    let filters=numericFilters.replace(regEx,
        (match)=>
            `-${operatorMap[match]}-`);
        const options=['runs','batAvg','bowlAvg','tests','highestScore','wickets'];
        filters=filters.split(',').forEach((item)=>{
            const [field,operator,value]=item.split('-')
            if (options.includes(field)){
                queryObject[field]={ [operator]:Number(value)}

            }
        });
        }
        console.log(queryObject);
        let result=work.find(queryObject);
        if (sort){
            const sortList=sort.split(',').join(' ');
            result=result.sort(sortList);
        }else{
            result=result.sort('runs');
        }
        if (fields){
            const fieldsList=fields.split(',').join(' ');
            result=result.select(fieldsList);
        }
        const page=Number(req.query.page)||1;
        const limit=Number(req.query.limit)||7;
        const skip=(page-1)*limit;
        result=result.skip(skip).limit(limit);
        const details=await result;
        res.status(200).json({details,nbHits:details.length});
})
    
const addCricketers=asyncWrap(async (req,res,next)=>{
        const tasks=await work.create(req.body);
        res.status(201).json({tasks});
    })
const removeCricketer=asyncWrap(async (req,res,next)=>{
    const query={...req.query};
    if (query.id){
        query._id=query.id;
        delete query.id;
    }
    if (Object.keys(query).length===0){
        return res.status(400).json({status:'failed',
            msg:'Please provide some attribute'});
    }
    const removedTask=await work.findOneAndDelete(query);
    if (!removedTask){
        res.status(404).json({
            status:"does not exist",
            msg:"Already deleted or not added at all"
        })
    }
    res.status(200).json({status:"Success",
        msg:"Successfully removed"
    })
})
const updateCricketer=asyncWrap(async (req,res,next)=>{
    const query={...req.query};
    if (query.id){
        query._id=query.id;
        delete query.id;
    }
    if (Object.keys(query).length===0){
        return res.status(400).json({status:'failed',
            msg:'Please provide some attribute'});
    }
    const updatedCricketer=await work.findOneAndUpdate(query,
        req.body,
        {
            new:true,
            runValidators:true
        }
    );
    if (!updatedCricketer){
        res.status(404).json({status:"failed",
            msg:"cricketer doesn't exist"
        })
    }
    res.status(200).json({status:"Success",
        msg:"Player stats updated"
    })
})
module.exports={
    cricAll,
    cricAllq,
    removeCricketer,
    updateCricketer,
    addCricketers
}
