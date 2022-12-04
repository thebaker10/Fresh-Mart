import mysql from "mysql"
import dotenv from "dotenv"

dotenv.config()

const con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

con.connect()

export async function search(productName: string) {
    return new Promise((resolve, reject) => {
        
        const sql = "SELECT product.`product_id`,`category_id`,`product_name`,`product_msrp`,`product_price`,`product_description`,`product_image_link`, AVG(review.rating) AS rating FROM `product` LEFT JOIN (review) ON product.product_id = review.product_id WHERE lower(`product_name`) like lower('" + productName + "%') GROUP by product.product_id;"
        con.query(sql, (error, rows, fields) => {
           
            resolve(rows)
        })
    })

}