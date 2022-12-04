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
        const sql = "SELECT `product_id`,`category_id`,`product_name`,`product_msrp`,`product_price`,`productImageLink`  FROM `product` WHERE lower(`product_name`) like lower('" + productName + "%');"

        con.query(sql, (error, rows, fields) => {
            resolve(rows)
        })
    })

}