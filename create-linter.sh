#!/bin/bash

# Check if a service name is provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <ServiceName-Kebab-Case>"
  exit 1
fi

# Inputs
PACKAGE_NAME=$1                                  # e.g., ace-sql-linter
CLASS_NAME=$(echo "$PACKAGE_NAME" | sed -r 's/(^|-)([a-z])/\U\2/g') # PascalCase: AceSqlLinter
CLASS_NAME_OPTIONS="${CLASS_NAME}Options"        # AceSqlLinterOptions
TEMPLATE_DIR="./templates/linter"
TARGET_DIR="./packages/$PACKAGE_NAME"

# Copy template
cp -r $TEMPLATE_DIR $TARGET_DIR

# Replace placeholders in files
find $TARGET_DIR -type f -exec sed -i "s/this-service/$PACKAGE_NAME/g" {} +
find $TARGET_DIR -type f -exec sed -i "s/ThisService/$CLASS_NAME/g" {} +
find $TARGET_DIR -type f -exec sed -i "s/ThisServiceOptions/$CLASS_NAME_OPTIONS/g" {} +

# Rename files containing 'this-service'
mv "$TARGET_DIR/src/this-service-converters.ts" "$TARGET_DIR/src/${PACKAGE_NAME}-converters.ts"
mv "$TARGET_DIR/src/this-service.ts" "$TARGET_DIR/src/${PACKAGE_NAME}.ts"

# Output success message
echo "Linter package '$PACKAGE_NAME' created at '$TARGET_DIR'"
