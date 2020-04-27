import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFunding: (_, args) => {
            const { sort, mainCategory, subCategory, id } = args; 

            // 상품 하나 상세 보기 
            if ( id !== undefined) {
                return prisma.fundings({ where: {
                    id
                }});
            }

            // 전체 상품 보기 (Main 화면에서 사용될 것)
            else if (mainCategory === undefined && subCategory === undefined) {
                // 분류 x 
                if(sort === undefined) {
                    return prisma.fundings({
                        orderBy: "createdAt_DESC"
                    })
                } 
                // 전체에서 베스트 아이템 8개 
                else if (sort === "best") {
                    return prisma.fundings({
                        orderBy: "numberOfParticipants_DESC",
                        first: 8 // 첫번째로부터 8개까지만 출력 
                    })
                }
                // 전체에서 최신 아이템 8개 
                else if (sort === "new") {
                    return prisma.fundings({
                        orderBy: "createdAt_DESC", 
                        first: 8
                    })
                }
            }
            // MainCategory별 상품 보기 (Store 화면에서 사용될 것)
            else if(mainCategory !== undefined && subCategory === undefined) {
                // MainCategory 전체 상품 보기 
                if (sort === undefined) {
                    return prisma.fundings({
                        where: {
                            mainCategory
                        }, 
                        orderBy: "createdAt_DESC"
                    })
                } 
                // MainCategory 전체 중 베스트 상품 8개 
                else if (sort === "best") {
                    return prisma.fundings({
                        where: {
                            mainCategory
                        }, 
                        orderBy: "numberOfParticipants_DESC"
                    })
                }
            }
            // MainCategory > SubCategory별 상품 보기 (Store 화면에서 사용) 
            else if(subCategory !== undefined) {
                // SubCategory 전체 상품 보기 
                if(sort === undefined) {
                    return prisma.fundings({
                        where: {
                            subCategory
                        }, 
                        orderBy: "createdAt_DESC"
                    })
                }
                // SubCategory 전체 중 베스트 상품 8개 
                else if (sort === "best") {
                    return prisma.fundings({
                        where: {
                            subCategory
                        }, 
                        orderBy: "numberOfParticipants_DESC"
                    })
                }
            } 
        }
    },
    Mutation : {
        seeFundingBest: (_, args) => {
            const { sort, mainCategory, subCategory } = args; 
            if(sort === "all" && mainCategory === "" && subCategory === "") {
                return prisma.fundings({
                    orderBy: "numberOfParticipants_DESC", 
                    first: 4
                })
            }

            if(sort === "all" && mainCategory !== "" && subCategory === "") {
                return prisma.fundings({
                    where: {
                        mainCategory
                    },
                    orderBy: "numberOfParticipants_DESC"
                })
            }

            if(sort === "all" && mainCategory !== "" && subCategory !== "") {
                return prisma.fundings({
                    where: {
                        subCategory
                    }, 
                    orderBy: "numberOfParticipants_DESC"
                })
            }
        },
        seeFundingAll: (_, args) => {
            const { id, sort, mainCategory, subCategory, first, skip } = args; 

            if(id !== undefined) {
                return prisma.fundings({ where: {
                    id
                }});
            }

            // 전체상품보기 
            if(sort === "all" && mainCategory === "") {
                return prisma.fundings({
                    orderBy: "createdAt_DESC",
                    first, 
                    skip
                })
            }
            // 대분류 상품 전체 보기 
            if(sort === "all" && mainCategory !== "" && subCategory === "") {
                return prisma.fundings({
                    where: {
                        mainCategory
                    }, 
                    orderBy: "createdAt_DESC",
                    first,
                    skip
                })
            }
            // 소분류 상품 전체 보기 
            if(sort === "all" && mainCategory !== "" && subCategory !== "") {
                return prisma.fundings({
                    where: {
                        subCategory
                    }, 
                    orderBy: "createdAt_DESC",
                    first,
                    skip
                })
            }
        }
    }
}