import {mongoose, Schema} from "mongoose"

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        cartItems: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Cart', cartSchema)