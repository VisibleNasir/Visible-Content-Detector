import sys
import json
import csv
import re
from collections import defaultdict

# Function to load categories and keywords from the CSV file
def load_categories(filepath):
    categories = defaultdict(list)
    try:
        with open(filepath, "r", encoding="utf-8") as file:
            reader = csv.reader(file)
            for row in reader:
                if len(row) >= 2:  # Ensure there are at least two columns (Category, Keyword)
                    category, keyword = row[0].strip(), row[1].strip().lower()
                    categories[category].append(keyword)
        return categories
    except FileNotFoundError:
        print(f"[!] Error: File '{filepath}' not found.")
        sys.exit(1)

# Function to clean and preprocess text
def clean_text(text):
    # Remove special characters and make it lowercase
    return re.sub(r'[^a-zA-Z\s]', '', text).lower()

# Function to analyze content and detect categories with reasoning
def analyze_content_with_reasoning(content, categories):
    # Split content into sections (You can split by paragraphs, sentences, etc.)
    sections = content.split("\n")

    detailed_results = []

    for section_number, section in enumerate(sections, start=1):
        clean_section = clean_text(section)
        words = set(clean_section.split())

        section_result = {
            "section_number": section_number,
            "section_text": section.strip(),
            "categories_detected": [],
            "reasons": {}
        }

        # Check each category for keywords
        for category, keywords in categories.items():
            matched_keywords = words.intersection(keywords)
            if matched_keywords:
                section_result["categories_detected"].append(category)
                section_result["reasons"][category] = list(matched_keywords)

        if section_result["categories_detected"]:
            detailed_results.append(section_result)

    return detailed_results

# Function to analyze the entire file and detect categories with reasoning
def analyze_file_with_reasoning(input_file, categories):
    try:
        with open(input_file, "r", encoding="utf-8") as file:
            content = file.read()

        detailed_results = analyze_content_with_reasoning(content, categories)

        return detailed_results

    except FileNotFoundError:
        print(f"[!] Error: File '{input_file}' not found.")
        sys.exit(1)

# Save results to a JSON file
def save_results_with_reasoning(results, output_file="detailed_results.json"):
    try:
        with open(output_file, "w", encoding="utf-8") as file:
            json.dump(results, file, indent=4)
        print(f"Results saved to {output_file}")
    except Exception as e:
        print(f"[!] Error saving results: {e}")

# Main function
if __name__ == "__main__":
    # Check if required arguments are passed
    if len(sys.argv) < 3:
        print("[!] Usage: python enhanced_category_detector.py <input_text_file> <category_csv_file>")
        sys.exit(1)

    input_file = sys.argv[1]
    category_file = sys.argv[2]

    # Load categories and keywords
    categories = load_categories(category_file)

    # Analyze the entire file and detect categories with reasoning
    detailed_results = analyze_file_with_reasoning(input_file, categories)

    # Output results (detailed reasoning for each section)
    if detailed_results:
        print("Detailed Results:")
        for result in detailed_results:
            print(f"\nSection {result['section_number']}:")
            print(f"  Text: {result['section_text']}")
            print(f"  Categories Detected: {', '.join(result['categories_detected'])}")
            print(f"  Reasons:")
            for category, matched_keywords in result["reasons"].items():
                print(f"    - {category}: Matched Keywords -> {', '.join(matched_keywords)}")

        # Save results to a JSON file
        save_results_with_reasoning(detailed_results)
    else:
        print("No categories detected.")
