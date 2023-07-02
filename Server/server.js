const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({origin:true, credentials: true}))

const stripe = require('stripe')("sk_test_51M8qlKHEhQ4vnNT3GPaQ5NnoLw0DhHojLtJQ4FSMQg7yvr6YNUtmGH2flU1TyTaciIFEv9Nhuy7CDt4YMwqgNrr500gNek4CAR")

app.post("/checkout", async (req, res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
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
               success_url: "http://localhost:4242/success.html",
               cancel_url: "http://localhost:4242/cancel.html",
            });
    
        res.status(200).send(session)
    }
    catch(err){
            console.log(err)
        }
})

app.listen(4242,()=>console.log('app is listening on 4242'))