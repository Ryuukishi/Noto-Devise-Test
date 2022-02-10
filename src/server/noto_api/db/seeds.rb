# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

note1 = Note.create(title: "useState()", description: "Use state is used for local state", code: "useState()", public: true)
note2 = Note.create(title: "useEffect()", description: "Use effect is used for side effects", code: "useEffect()", public: true)
note3 = Note.create(title: "useReducer()", description: "Use reducer is used for other functions", code: "useReducer()", public: true)

note1.tags.create(title: "React")
note1.tags.create(title: "State")

note2.tags.create(title: "Hook")
reacttag = Tag.find_by(title: "React")
note2.tags << reacttag

note3.tags << reacttag
