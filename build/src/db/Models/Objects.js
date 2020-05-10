//@ts-ignore
var mongoose = require("mongoose");
//@ts-ignore
var Schema = mongoose.Schema;
mongoose.model("Objects", new Schema({
    key: String,
    name: String,
    name_plural: String,
    overviews: {},
    fields: {},
    api: {
        read: { active: Boolean, endpoint: String, authentication: String },
        create: { active: Boolean, endpoint: String, authentication: String },
        modifyOwn: {
            active: Boolean,
            endpoint: String,
            authentication: String,
        },
        write: { active: Boolean, endpoint: String, authentication: String },
        deleteOwn: {
            active: Boolean,
            endpoint: String,
            authentication: String,
        },
        delete: { active: Boolean, endpoint: String, authentication: String },
    },
    layouts: {},
    permissions: {
        read: [String],
        create: [String],
        modifyOwn: [String],
        write: [String],
        delete: [String],
        deleteOwn: [String],
    },
}, { strict: false }));
