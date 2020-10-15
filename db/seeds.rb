# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Test Users
demo = User.create(username: "demo", email: "welcometo@azena", password: "demopass")
test = User.create(username: "test", email: "test@test", password: "password")
boosqua = User.create(username: "boosqua", email: "boosqua@email.com", password: "password")
cynthia = User.create(username: "mochi", email: "mochi@email.com", password: "password")