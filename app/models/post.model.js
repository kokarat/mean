//สร้าง Schema
var PostSchema = new Schema({

    title: {
        type: String,
        requited: true
    },

    content: {
        type: String,
        requited: true
    },

    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

PostSchema.pre('save', function(next){
    now = new Date.now;
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

// สร้่าง model
mongoose.model('Post',PostSchema);