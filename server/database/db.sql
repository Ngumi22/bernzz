-- Table: addresses
CREATE TABLE addresses (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    type varchar(255),
    address_line1 varchar(255),
    address_line2 varchar(255),
    city varchar(255),
    state varchar(255),
    postal_code varchar(20),
    country varchar(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: payments
CREATE TABLE payments (
    id serial PRIMARY KEY,
    order_id integer REFERENCES sales_orders(id),
    method varchar(255),
    amount numeric,
    transaction_id varchar(255),
    status varchar(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: product_reviews
CREATE TABLE product_reviews (
    id serial PRIMARY KEY,
    product_id varchar(255) REFERENCES products(sku),
    user_id integer REFERENCES users(id),
    rating numeric,
    comment text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: product_inventory
CREATE TABLE product_inventory (
    id serial PRIMARY KEY,
    product_id varchar(255) REFERENCES products(sku),
    quantity integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: shipping_methods
CREATE TABLE shipping_methods (
    id serial PRIMARY KEY,
    name varchar(255),
    description text,
    cost numeric,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: order_shipments
CREATE TABLE order_shipments (
    id serial PRIMARY KEY,
    order_id integer REFERENCES sales_orders(id),
    shipping_method_id integer REFERENCES shipping_methods(id),
    tracking_number varchar(255),
    status varchar(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: analytics_data
CREATE TABLE analytics_data (
    id serial PRIMARY KEY,
    event_type varchar(255),
    event_data jsonb,
    user_id integer REFERENCES users(id),
    session_id varchar(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: reports
CREATE TABLE reports (
    id serial PRIMARY KEY,
    name varchar(255),
    description text,
    query text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: scheduled_reports
CREATE TABLE scheduled_reports (
    id serial PRIMARY KEY,
    report_id integer REFERENCES reports(id),
    scheduled_time timestamp with time zone,
    recipients text[],
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


-- Table: categories
CREATE TABLE categories (
    id serial PRIMARY KEY,
    name varchar(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: cc_transactions
CREATE TABLE cc_transactions (
    code varchar(255) PRIMARY KEY,
    order_id integer,
    transdate timestamp with time zone,
    processor varchar(255),
    processor_trans_id varchar(255),
    amount numeric,
    cc_num varchar(255),
    cc_type varchar(255),
    response text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: coupons
CREATE TABLE coupons (
    id serial PRIMARY KEY,
    code varchar(255),
    description text,
    active bool,
    value numeric,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    multiple bool DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: order_products
CREATE TABLE order_products (
    sku varchar(255) NOT NULL,
    order_id integer NOT NULL,
    name varchar(255),
    description text,
    price numeric,
    quantity integer,
    subtotal numeric,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (sku, order_id)
);

-- Table: product_categories
CREATE TABLE product_categories (
    category_id integer NOT NULL,
    product_sku varchar(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (category_id, product_sku),
    FOREIGN KEY (product_sku) REFERENCES products(sku) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Table: product_statuses
CREATE TABLE product_statuses (
    id serial PRIMARY KEY,
    name varchar(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: product_tags
CREATE TABLE product_tags (
    product_sku varchar(255) NOT NULL,
    tag_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_sku, tag_id),
    FOREIGN KEY (product_sku) REFERENCES products(sku) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);


-- Table: products
CREATE TABLE products (
    sku varchar(255) PRIMARY KEY,
    name varchar(255),
    description text,
    product_status_id integer,
    regular_price numeric,
    discount_price numeric,
    category_id integer,
    quantity integer,
    taxable bool,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    image varchar(255),
    thumbnail1 varchar(255),
    thumbnail2 varchar(255),
    thumbnail3 varchar(255),
    thumbnail4 varchar(255),
    CPU varchar(255),
    RAM varchar(255),
    Storage varchar(255),
    Ports varchar(255),
    Webcam varchar(255),
    Connectivity varchar(255),
    Processor varchar(255),
    OperatingSystem varchar(255),
    Weight varchar(255),
    ScreenSize varchar(255),
    CameraResolution varchar(255),
    BatteryLife varchar(255),
    PrintSpeed varchar(255),
    WiFi varchar(255),
    Copying varchar(255),
    Scanning varchar(255),
    PaperHandling varchar(255),
    Consumables varchar(255),
    PrinterSoftware varchar(255),
    NetworkProtocol varchar(255),
    Interface varchar(255),
    NetworkCompatibility varchar(255),
    SIMCardSlot varchar(255),
    WirelessConnectivity varchar(255),
    MaxDevicesConnected varchar(255),
    Battery varchar(255),
    Security varchar(255),
    Display varchar(255),
    AccessControl varchar(255),
    Compatibility varchar(255),
    ViewableImageArea varchar(255),
    AspectRatio varchar(255),
    Contrast varchar(255),
    Resolution varchar(255),
    Cores varchar(255),
    ProcessorFrequency varchar(255),
    Memory varchar(255),
    Graphics varchar(255),
    PowerSupply varchar(255),
    Dimensions varchar(255),
    FOREIGN KEY (product_status_id) REFERENCES product_statuses(id),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);


-- Table: roles
CREATE TABLE roles (
    id serial PRIMARY KEY,
    name varchar(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: sales_orders
CREATE TABLE sales_orders (
    id serial PRIMARY KEY,
    order_date date,
    total numeric,
    coupon_id integer,
    session_id varchar(255),
    user_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (coupon_id) REFERENCES coupons(id),
    FOREIGN KEY (session_id) REFERENCES sessions(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table: sessions
CREATE TABLE sessions (
    id varchar(255) PRIMARY KEY,
    data text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: tags
CREATE TABLE tags (
    id serial PRIMARY KEY,
    name varchar(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Table: user_roles
CREATE TABLE user_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Table: users
CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE,
    first_name varchar(255),
    last_name varchar(255),
    active bool,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
