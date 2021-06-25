const gql = require("graphql-tag");

module.exports = gql`
  type User {
    id: ID!
    username: String
    email: String
    token: String
    createdAt: String
  }
  input LoginInput {
    username: String!
    password: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmpassword: String!
    email: String!
  }
  type Query {
    sayHi: String
    login(loginInput: LoginInput): User
  }
  type Mutation {
    register(registerInput: RegisterInput): User
  }
`;
