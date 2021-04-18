import IDatabase from "../interfaces/database.interface.ts";
import IPost from "../interfaces/post.interface";

// Please feel free to not use this, or completely change it to your liking. It is just an example.
const database: IDatabase = {
  users: [
    {
      id: "1",
      email: "gates@gmail.com",
      password: "gates123",
      firstName: "Bill",
      lastName: "Gates",
      username: "billgates",
      posts: [
        {
          postId: "abc1",
          userId: "billgates",
          message: "Microsoft is a nice company",
          createdAt: new Date(),
          likes: { Linus: true, Obama: true, Armaan: true },
          reposts: 5,
          comments: 0,
          commentList: [
            {
              id: "abc2",
              createdAt: new Date(),
              userId: "billgates",
              message: "this is some random comment",
            },
          ],
        },
      ],
      following: [],
      reposts: [],
    },
    {
      id: "2",
      username: "james123",
      email: "james123@gmail.com",
      password: "james123",
      firstName: "James",
      lastName: "Smith",
      posts: [
        {
          postId: "abc3",
          userId: "james123",
          message: "A post by james",
          createdAt: new Date(),
          likes: { Linus: true, Obama: true, Sinus: true, Wobama: true, Sinux: true, Wobamo: true },
          reposts: 50,
          comments: 12,
          commentList: [
            {
              id: "abc4",
              createdAt: new Date(),
              userId: "billgates",
              message: "Cool post james. Glad I decided to follow you.",
            },
          ],
        },
        {
          postId: "abc5",
          userId: "james123",
          message: "Nice weather today in Vancouver",
          createdAt: new Date(),
          likes: { Sinus: true, Wobama: true, Linus: true, Obama: true },
          reposts: 50,
          comments: 12,
          commentList: [
            {
              id: "abc6",
              userId: "billgates",
              createdAt: new Date(),
              message: "The weather is always nice when you're rich like me.",
            },
          ],
        },
      ],
      following: [],
      reposts: [],
    },
  ],
};

// -------- Note: I only created these as a simple test example for you, delete them later and use above db or your own --------------
const userDatabase = [ // user database to mock session data
  {
    id: "1",
    username: "Armaan", 
    email: "ad123@gmail.com",
    password: "ad123123!",
    role: "admin",
  },
  {
    id: "2",
    username: "John",
    email: "jo123@gmail.com",
    password: "jo123",
    role: "user",
  },
];

const post = {
  postId: "1",
  userId: "billgates",
  createdAt: "Thursday, March 2nd",
  message: "I'm seriously considering acquiring devHouse for 6 billion dollars...",
  comments: "0",
  reposts: "0",
  likes: { Linus: true, Obama: true },
  commentList: [],
};

const posts: IPost[] = [
  {
    postId: "1",
    userId: "billgates",
    createdAt: new Date(),
    message: "I'm seriously considering acquiring devHouse for 6 billion dollars...",
    comments: 0,
    reposts: 0,
    likes: {},
    commentList: [],
  },
  {
    postId: "5",
    userId: "john",
    createdAt: new Date(),
    message: "Hi there",
    comments: 4,
    reposts: 2,
    likes: { Linus: true, Obama: true },

    commentList: [],
  },
  {
    postId: "4",
    userId: "john",
    createdAt: new Date(),
    message: "this is a new post by me",
    comments: 4,
    reposts: 2,
    likes: { Matteo: true, Linus: true, Obama: true },

    commentList: [],
  },
];

export { userDatabase, database, post, posts };
