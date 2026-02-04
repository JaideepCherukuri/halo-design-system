
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to https://halofy.ai...")
            page.goto("https://halofy.ai")
            
            # Wait for content to load (React app)
            # We look for something that suggests the app loaded, e.g., text or an element
            page.wait_for_load_state('networkidle')
            print("Page loaded (networkidle).")
            
            # Get title
            print(f"Title: {page.title()}")
            
            # Get some text content
            content = page.content()
            print(f"Content length: {len(content)}")
            
            # Check for specific text we added in description
            if "financial infrastructure for the agentic economy" in content:
                print("SUCCESS: Found new description text in rendered content.")
            else:
                print("WARNING: Did not find specific text. Dumping first 500 chars of body text:")
                print(page.inner_text('body')[:500])

            # Take screenshot
            page.screenshot(path="crawl_debug.png")
            print("Screenshot saved to crawl_debug.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
