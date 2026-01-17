import httpx
import asyncio
import sys
import json

BASE_URL = "http://localhost:8000"

async def test_backend():
    print("--- Starting Backend Integration Tests ---")
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        # 1. Health Check (Test SQL and Mongo connections)
        print("\n1. Testing Health Check...")
        try:
            resp = await client.get(f"{BASE_URL}/health")
            print(f"Status: {resp.status_code}")
            print(f"Content: {resp.text}")
            assert resp.status_code == 200
            data = resp.json()
            assert data["database_sql"] == "OK"
            assert data["database_mongo"] == "OK"
            print("âœ… Health Check Passed (SQL & Mongo are connected)")
        except Exception as e:
            print(f"â Œ Health Check Failed: {e}")
            return

        # 2. Auth: Register
        print("\n2. Testing Registration...")
        email = f"test_{int(asyncio.get_event_loop().time())}@example.com"
        password = "testpassword123"
        try:
            resp = await client.post(
                f"{BASE_URL}/api/v1/auth/register",
                json={"email": email, "password": password}
            )
            print(f"Status: {resp.status_code}")
            assert resp.status_code == 200
            user_data = resp.json()
            user_id = user_data["id"]
            print(f"âœ… Registration Passed (User ID: {user_id})")
        except Exception as e:
            print(f"â Œ Registration Failed: {e}")
            return

        # 3. Auth: Login
        print("\n3. Testing Login...")
        try:
            resp = await client.post(
                f"{BASE_URL}/api/v1/auth/login",
                json={"email": email, "password": password}
            )
            print(f"Status: {resp.status_code}")
            assert resp.status_code == 200
            token_data = resp.json()
            token = token_data["access_token"]
            print("âœ… Login Passed (Token received)")
        except Exception as e:
            print(f"â Œ Login Failed: {e}")
            return

        # 4. Leads: Extract (Scraping + Mongo Save + ML Classification)
        print("\n4. Testing Lead Extraction with ML...")
        try:
            # Usando una URL que probablemente contenga palabras clave "Hot" para la prueba
            resp = await client.post(
                f"{BASE_URL}/api/v1/leads/extract",
                json={"url": "https://www.salesforce.com/products/pricing/", "owner_id": user_id}
            )
            print(f"Status: {resp.status_code}")
            assert resp.status_code == 200
            lead_data = resp.json()
            lead_id = lead_data["_id"]
            
            # Verificar campos de ML
            assert "status" in lead_data
            assert "ml_score" in lead_data
            assert "ml_analysis" in lead_data
            print(f"Prediction: {lead_data['status']} (Score: {lead_data['ml_score']})")
            
            print(f"âœ… Lead Extraction Passed (Lead ID: {lead_id})")
        except Exception as e:
            print(f"â Œ Lead Extraction Failed: {e}")
            return

        # 5. User Specific: Get User Leads
        print(f"\n5. Testing Get Leads for User {user_id}...")
        try:
            resp = await client.get(f"{BASE_URL}/api/v1/users/{user_id}/leads")
            print(f"Status: {resp.status_code}")
            assert resp.status_code == 200
            leads = resp.json()
            assert len(leads) > 0
            print(f"âœ… Get User Leads Passed (Found {len(leads)} leads)")
        except Exception as e:
            print(f"â Œ Get User Leads Failed: {e}")
            return

        # 6. User Specific: Get User Stats
        print(f"\n6. Testing Get Stats for User {user_id}...")
        try:
            resp = await client.get(f"{BASE_URL}/api/v1/users/{user_id}/stats")
            print(f"Status: {resp.status_code}")
            assert resp.status_code == 200
            stats = resp.json()
            print(f"Stats: {stats['stats']}")
            assert stats["user_id"] == user_id
            print("âœ… Get User Stats Passed")
        except Exception as e:
            print(f"â Œ Get User Stats Failed: {e}")
            return

        # 7. Leads: Delete
        print("\n7. Testing Lead Deletion...")
        try:
            resp = await client.delete(f"{BASE_URL}/api/v1/leads/{lead_id}")
            print(f"Status: {resp.status_code}")
            assert resp.status_code == 200
            print("âœ… Lead Deletion Passed")
        except Exception as e:
            print(f"â Œ Lead Deletion Failed: {e}")
            return

    print("\n--- All Tests Completed Successfully ---")

if __name__ == "__main__":
    asyncio.run(test_backend())
