export interface Hostel {
    id: number,
    name: string,
    address: string,
    image_url: string,
    owner_id: string,
    update_date?: Date,
    created_at?: Date,
}


export interface Room {
    id: number,
    name: string,
    monthly_price: number,
    description: string,
    image_url: string,
    hostel_id: number
    update_date?: Date,
    created_at?: Date,
}

