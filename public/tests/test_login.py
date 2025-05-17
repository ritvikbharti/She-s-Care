from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def test_valid_login():
    driver = webdriver.Chrome()
    driver.get("http://localhost:5173/login")  # Replace with your actual login route

    driver.find_element(By.NAME, "email").send_keys("test@example.com")
    driver.find_element(By.NAME, "password").send_keys("123456")
    driver.find_element(By.ID, "login-button").click()  # Replace with your button's ID

    time.sleep(2)
    assert "dashboard" in driver.current_url  # Adjust based on your redirect route

    driver.quit()
