//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const ip = "127.0.0.1:27017";
mongoose
  .connect(
    "mongodb+srv://mayankjain1784:test123@cluster0.reetw4s.mongodb.net/todoListDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }
  )
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error(err));
const itemsSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "its item 1",
});

const item2 = new Item({
  name: "its item 2",
});
const item3 = new Item({
  name: "its item 3",
});
const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const List = mongoose.model("List", listSchema);
async function getListItems(modelName) {
  let foundItems = [];
  try {
    foundItems = await modelName.find({});
    return foundItems;
  } catch (err) {
    console.log(err);
  }
}
async function deleteOneItem(itemId) {
  try {
    await Item.findByIdAndRemove(itemId);
    return console.log("successfully removed");
  } catch (err) {
    console.log(err);
  }
}
app.get("/", function (req, res) {
  const day = date.getDate();

  getListItems(Item).then(function (foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems);
      res.redirect("/");
    } else res.render("list", { listTitle: day, newListItems: foundItems });
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName,
  });
  if (listName === date.getDate()) {
    item.save();
    res.redirect("/");
  } else {
    async function listFindOne() {
      try {
        foundList = await List.findOne({ name: listName });
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      } catch (err) {
        console.log(err);
      }
    }
    listFindOne();
  }
});
app.post("/delete", function (req, res) {
  const checkedItem = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === date.getDate()) {
    deleteOneItem(checkedItem);
    res.redirect("/");
  } else {
    async function updation() {
      try {
        await List.findOneAndUpdate(
          { name: listName },
          { $pull: { items: { _id: checkedItem } } }
        );

        res.redirect("/" + listName);
      } catch (err) {
        console.log(err);
      }
    }
    updation();
  }
});
app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  async function findOneon() {
    try {
      foundList = await List.findOne({ name: customListName });
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          listTitle: customListName,
          newListItems: foundList.items,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  findOneon();
});
app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
