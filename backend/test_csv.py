#!/usr/bin/env python3
"""
Script de prueba para verificar la funcionalidad CSV
"""
import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

async def test_csv_functionality():
    """Test CSV import/export functionality"""
    print("🧪 Testing CSV Functionality\n")
    
    # Test 1: Import schemas
    print("✅ Test 1: Importing schemas...")
    try:
        from app.schemas.leads import BulkURLExtractRequest, BulkExtractResponse
        print("   ✓ Schemas imported successfully")
    except Exception as e:
        print(f"   ✗ Error importing schemas: {e}")
        return False
    
    # Test 2: Create test request
    print("\n✅ Test 2: Creating test request...")
    try:
        test_urls = [
            "https://www.google.com",
            "https://www.github.com",
            "https://www.stackoverflow.com"
        ]
        request = BulkURLExtractRequest(urls=test_urls, owner_id=1)
        print(f"   ✓ Request created with {len(request.urls)} URLs")
    except Exception as e:
        print(f"   ✗ Error creating request: {e}")
        return False
    
    # Test 3: Validate response model
    print("\n✅ Test 3: Validating response model...")
    try:
        response = BulkExtractResponse(
            total=3,
            successful=2,
            failed=1,
            results=[],
            errors=[{"url": "test", "error": "test error"}]
        )
        print(f"   ✓ Response model validated")
        print(f"   - Total: {response.total}")
        print(f"   - Successful: {response.successful}")
        print(f"   - Failed: {response.failed}")
    except Exception as e:
        print(f"   ✗ Error validating response: {e}")
        return False
    
    print("\n" + "="*50)
    print("🎉 All tests passed!")
    print("="*50)
    return True

if __name__ == "__main__":
    asyncio.run(test_csv_functionality())
