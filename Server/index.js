const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
// middle wares
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({origin:true, credentials: true}))

const stripe = require('stripe')("sk_test_51M8qlKHEhQ4vnNT3GPaQ5NnoLw0DhHojLtJQ4FSMQg7yvr6YNUtmGH2flU1TyTaciIFEv9Nhuy7CDt4YMwqgNrr500gNek4CAR")

const uri = "mongodb+srv://Barohal_industry:dofmxSwCGqSzuGOx@cluster0.sc93kvm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function dbConnect(){
    try {
        client.connect();
    } catch (err) {console.log(err.name)}
}

const Products = client.db("barohal-store-db").collection('products')
dbConnect();

app.get("/products", async (req, res) => {
  try{
    const cursor = Products.find({});
    const products = await cursor.toArray();
      res.send( products);
  }
  catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }

})
app.get("/products/categories", async (req, res) => {
  try{
    const cursor = Products.find({},'category');
    
    const products = await cursor.toArray();
    
    const productCategory = products.map((product) => product.category);
     const category = [...new Set(productCategory)]
      res.send( category);
  }
  catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }

})

app.post("/checkout", async (req, res) => {
    try{
        const session = await stripe.checkout.sessions.create({
          shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'BD', 'IN', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'CN', 'JP'],
          },
            shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 0,
                      currency: 'usd',
                    },
                    display_name: 'Free shipping',
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 5,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 7,
                      },
                    },
                  },
                },
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 1500,
                      currency: 'usd',
                    },
                    display_name: 'Next day air',
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 1,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 1,
                      },
                    },
                  },
                },
              ],
            line_items:  req.body.items.map((item) => ({
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: item.name,
                    images: [item.product]
                  },
                  unit_amount: item.price * 100,
                },
                quantity: item.quantity,
              })),
               mode: "payment",
               success_url: "https://barohal-store-server.netlify.app/success.html",
               cancel_url: "https://barohal-store-server.netlify.app/cancel.html",
            });
    
        res.status(200).send(session)
    }
    catch(err){
            console.log(err)
        }
})
app.get("/", (req, res) => {
  res.send("Barohal-shop server is running");
});
app.listen(4242,()=>console.log('app is listening on 4242'))