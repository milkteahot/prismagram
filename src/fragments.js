export const COMMENT_FRAGMENT = `
        id
        text
        user {
            ${USER_FRAGMENT}
        }
`
export const USER_FRAGMENT = `
        id
        userName
`
export const FILE_FRAGMENT = `
        id
        url
`