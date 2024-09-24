import requests
import json
import random
import string

# Function to generate a random email
def generate_random_email():
    domains = ["example.com", "test.com", "mail.com"]
    name = ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))
    domain = random.choice(domains)
    return f"{name}@{domain}"

# Function to create a user
def create_user(name, email, password, role):
    url = 'https://api.autoassure.me/api/users'
    headers = {'Content-Type': 'application/json'}
    body = {
        "name": name,
        "email": email,
        "password": password,
        "role": role
    }
    response = requests.post(url, headers=headers, data=json.dumps(body))
    if response.status_code == 200:
        response_json = response.json()
        if 'data' in response_json:
            print(email + " - " + password)
            return response_json['data']
        else:
            print(f"Error: 'data' key not found in response: {response_json}")
            return None
    else:
        print(f"Error: Failed to create user. Status code: {response.status_code}, Response: {response.text}")
        return None

# Function to create a vehicle
def create_vehicle(title, color, brand, model, yom, condition, transmission, body_type, fuel_type, mileage, description, price, seller_id, inspection_status, inspection_report, address, state, postal_code):
    url = 'https://api.autoassure.me/api/vehicle/'
    headers = {
        'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZlMTYwZjEzNmM1NzQxY2M0N2FhYmUwIiwibmFtZSI6InRlc3QgdGVzdCIsInJvbGUiOiJzZWxsZXIiLCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiZXhwIjoxNzU3NjQ5Mjc5LCJpYXQiOjE3MjYxMTMyNzl9.wv_khgL9z56Q6sl7MriUaDebojB9mjJHUrqRAEIfZiQ',
        'Content-Type': 'application/json'
    }
    body = {
        "title": title,
        "color": color,
        "brand": brand,
        "model": model,
        "yom": yom,
        "condition": condition,
        "transmission": transmission,
        "body_type": body_type,
        "fuel_type": fuel_type,
        "mileage": mileage,
        "description": description,
        "price": price,
        "seller_id": seller_id,
        "inspection_status": inspection_status,
        "inspection_report": inspection_report,
        "address": address,
        "state": state,
        "postal_code": postal_code
    }
    response = requests.post(url, headers=headers, data=json.dumps(body))
    if response.status_code == 200:
        response_json = response.json()
        if 'data' in response_json:
            return response_json['data']
        else:
            print(f"Error: 'data' key not found in response: {response_json}")
            return None
    else:
        print(f"Error: Failed to create vehicle. Status code: {response.status_code}, Response: {response.text}")
        return None

# Create users
users = []
for i in range(1, 6):
    email = generate_random_email()
    user = create_user(f"Seller{i}", email, "Test@123", "seller")
    if user:
        users.append(user)
    email = generate_random_email()
    user = create_user(f"Mechanic{i}", email, "Test@123", "mechanic")
    if user:
        users.append(user)

# Create vehicles
vehicles = []
postal_codes = ["3168", "3167", "3166"]
for i in range(1, 21):
    sellers = [user for user in users if user and user['role'] == 'seller']
    if sellers:
        seller = random.choice(sellers)
        inspection_status = "requested" if i % 2 == 0 else "not_requested"
        inspection_report = {
            "status": "requested",
            "vehicle_rego": f"1VR2UD{i}",
            "postal_code": random.choice(postal_codes),
            "inspection_time": "2024/12/20"
        } if inspection_status == "requested" else {}
        address = "5, Cun Place, Chadstone"
        state = "VIC"
        postal_code = random.choice(postal_codes)
        price = random.randint(20000, 80000)  # Random price between 20,000 and 80,000
        vehicle = create_vehicle(
            f"test vehicle {i}", "grey", "Toyota", "corolla", 2015, "Brand New", "Automatic", "sedan", "Petrol", 5,
            f"test description {i}", price, seller['_id'], inspection_status, inspection_report, address, state, postal_code
        )
        if vehicle:
            vehicles.append(vehicle)

# Output created users and vehicles
# print(json.dumps(users, indent=4))
# print(json.dumps(vehicles, indent=4))
