import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
let blogArr = []; //keeps track of all the blogs

app.get("/", (req, res) => {
  res.render("index.ejs", { blogs: blogArr });
});

app.post("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/done", (req, res) => {
  console.log(req.body);
  console.log(blogArr);

  //check to see if the new entry is already there
  let duplicate = blogArr.some(
    (obj) => JSON.stringify(obj) === JSON.stringify(req.body)
  );

  if (!duplicate) {
    console.log("PUSH?");
    blogArr.push(req.body);
  }

  res.render("index.ejs", { blogs: blogArr, duplication: duplicate });
});

app.post("/delete", (req, res) => {
  console.log(req.body);
  let index = Number(Object.keys(req.body));
  if (index === 0) {
    blogArr.shift();
  } else if (index === blogArr.length - 1) {
    blogArr.pop();
  } else {
    let gone = blogArr.splice(index, 1);
  }
  res.render("index.ejs", { blogs: blogArr });
});

app.post("/update", (req, res) => {
  console.log(req.body);
  let index = Number(Object.keys(req.body));
  let updateBlog = blogArr[index];
  console.log(updateBlog);
  let title;
  let text;
  if (updateBlog) {
    let title = updateBlog.blogTitle;
    let test = updateBlog.blogText;
    console.log(title);
    console.log(text);
  }
  //   let text = blogArr[index].blogTitle;
  res.render("create.ejs", { title: title, text: text });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
