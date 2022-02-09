export function getNumberOfComments(comments=[]) {
    let numberOfComments = comments.reduce((acc, curr) => {
        if (curr.replies) {
            return ++acc + curr.replies.length
        }
        return ++acc
    }, 0)

    return numberOfComments
}