import { gpl } from "@apollo/client";

export const LOGIN_USER = gql`
mutation login($email: String!, password: String!) {
    login(email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $userId: ID!
    $description: String!
    $title: String!
    $author: String
    $image: String
    $link: String
  ) {
    saveBook(
      userId: $userId
      description: $description
      title: $title
      author: $author
      image: $image
      link: $link
    ) {
      _id
      bookCount
      email
      savedBooks {
        _id
        authors
        description
        title
      }
      username
    }
  }
`;
