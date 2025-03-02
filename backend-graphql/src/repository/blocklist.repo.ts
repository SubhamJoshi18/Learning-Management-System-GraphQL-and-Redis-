import BlockList from "../database/schemas/blockList.schema"

class BlockListRepository {

    async findToken (token : string) {
        const tokenExists = BlockList.findOne({
            accessToken : token
        })
        return tokenExists
    }

    async createToken (token : string) {
         const savedToken = BlockList.create({
            accessToken : token,
            isBlockList : true
         })
         return savedToken
    }
}


export default BlockListRepository