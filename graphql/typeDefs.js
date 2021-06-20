const gql = require("graphql-tag");

module.exports = gql`
  type User {
    id: ID!
    username: String
    email: String
    token: String
    createdAt: String
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmpassword: String!
    email: String!
  }
  type Query {
    sayHi: String
  }
  type Mutation {
    register(registerInput: RegisterInput): User
  }
`;
