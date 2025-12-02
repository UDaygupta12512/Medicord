import mongoose, { Document, Schema } from 'mongoose';

export interface IMedicine extends Document {
    name: string;
    genericName: string;
    brandName: string;
    manufacturer: string;
    composition: string[];
    dosageForm: string;
    strength: string;
    price: {
        mrp: number;
        discounted?: number;
        currency: string;
    };
    category: string;
    prescriptionRequired: boolean;
    description: string;
    uses: string[];
    sideEffects: string[];
    precautions: string[];
    contraindications: string[];
    interactions: string[];
    dosage: {
        adult?: string;
        child?: string;
        elderly?: string;
    };
    storage: string;
    availability: {
        inStock: boolean;
        lastUpdated: Date;
    };
    images: string[];
    barcode?: string;
    ratings: {
        average: number;
        count: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const MedicineSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Medicine name is required'],
            trim: true,
            index: true,
        },
        genericName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        brandName: {
            type: String,
            trim: true,
        },
        manufacturer: {
            type: String,
            required: [true, 'Manufacturer is required'],
            trim: true,
        },
        composition: [{
            type: String,
            required: true,
        }],
        dosageForm: {
            type: String,
            required: true,
            enum: ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Inhaler', 'Powder', 'Other'],
        },
        strength: {
            type: String,
            required: true,
        },
        price: {
            mrp: {
                type: Number,
                required: true,
            },
            discounted: Number,
            currency: {
                type: String,
                default: 'INR',
            },
        },
        category: {
            type: String,
            required: true,
            enum: ['Antibiotic', 'Painkiller', 'Antiviral', 'Antifungal', 'Vitamin', 'Supplement', 'Cardiac', 'Diabetic', 'Other'],
        },
        prescriptionRequired: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            required: true,
        },
        uses: [String],
        sideEffects: [String],
        precautions: [String],
        contraindications: [String],
        interactions: [String],
        dosage: {
            adult: String,
            child: String,
            elderly: String,
        },
        storage: {
            type: String,
            default: 'Store in a cool, dry place away from direct sunlight',
        },
        availability: {
            inStock: {
                type: Boolean,
                default: true,
            },
            lastUpdated: {
                type: Date,
                default: Date.now,
            },
        },
        images: [String],
        barcode: String,
        ratings: {
            average: {
                type: Number,
                default: 0,
                min: 0,
                max: 5,
            },
            count: {
                type: Number,
                default: 0,
            },
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for search optimization
MedicineSchema.index({ name: 'text', genericName: 'text', composition: 'text' });
MedicineSchema.index({ category: 1 });
MedicineSchema.index({ manufacturer: 1 });

export default mongoose.model<IMedicine>('Medicine', MedicineSchema);
