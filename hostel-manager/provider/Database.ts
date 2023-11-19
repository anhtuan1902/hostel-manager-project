export interface Hostel {
    id: number,
    name: string,
    address: string,
    image_url: string,
    owner_id: string,
    update_date: Date,
    created_at: Date,
}


export interface Room {
    id: number,
    name: string,
    monthly_price: number,
    description: string,
    image_url: string,
    hostel_id: number
    update_date?: Date,
    created_at: Date,
}

export interface Lessee {
    id: number,
    name: string,
    citizen_id: string,
    phone_number: string,
    owner_id: number,
    image_url?: string,
    created_at: Date,
}


export interface Contract {
    id: number,
    lessee_id: number,
    hostel_id: number,
    room_id: number,
    start_date: Date,
    expired_date: Date,
    monthly_payment_day: number,
    monthly_price: number,
    file_url: string
    created_at: Date,
    hostels?: Hostel,
    rooms?: Room,
    manage_lessee?: Lessee ,
}

