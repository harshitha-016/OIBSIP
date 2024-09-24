from flask import Flask, render_template, request, redirect, url_for, session
import hashlib
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for session management

# Store user data in a text file
user_db = 'user_data.txt'

# Function to hash passwords for security
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Function to check if user exists
def user_exists(username):
    if not os.path.exists(user_db):
        return False
    with open(user_db, 'r') as file:
        for line in file:
            stored_username, _ = line.strip().split(',')
            if stored_username == username:
                return True
    return False

# Function to verify user credentials
def verify_credentials(username, password):
    hashed_password = hash_password(password)
    with open(user_db, 'r') as file:
        for line in file:
            stored_username, stored_password = line.strip().split(',')
            if stored_username == username and stored_password == hashed_password:
                return True
    return False

# Route to the home page
@app.route('/')
def index():
    return render_template('index.html')  # Home page with buttons

# Route for user registration
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        
        if user_exists(username):
            return "Username already exists. Please choose another."
        if password != confirm_password:
            return "Passwords do not match. Try again."
        
        hashed_password = hash_password(password)
        with open(user_db, 'a') as file:
            file.write(f"{username},{hashed_password}\n")
        
        return redirect(url_for('login'))

    return render_template('register.html')

# Route for user login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if not user_exists(username):
            return "Username not found. Please register first."
        
        if verify_credentials(username, password):
            session['username'] = username
            return redirect(url_for('secured_page'))
        else:
            return "Invalid password. Please try again."
    
    return render_template('login.html')

# Route for the secured page
@app.route('/secured_page')
def secured_page():
    if 'username' in session:
        return f"Welcome to the secured page, {session['username']}!"
    else:
        return redirect(url_for('login'))

# Route to logout
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
