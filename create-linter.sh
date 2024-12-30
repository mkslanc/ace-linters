#!/bin/bash

# Check if both service name and mode are provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <ServiceName-Kebab-Case> <ModeName>"
  exit 1
fi

# Inputs
PACKAGE_NAME=$1                                  # e.g., ace-sql-linter
MODE_NAME=$2                                     # e.g., mysql
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
find $TARGET_DIR -type f -exec sed -i "s/\[Linter Name\]/$CLASS_NAME/g" {} +
find $TARGET_DIR -type f -exec sed -i "s/\[linter-name\]/$PACKAGE_NAME/g" {} +
find $TARGET_DIR -type f -exec sed -i "s/\[LinterClassName\]/$CLASS_NAME/g" {} +
find $TARGET_DIR -type f -exec sed -i "s/\[mode-name\]/$MODE_NAME/g" {} +

# Rename files containing 'this-service'
mv "$TARGET_DIR/src/this-service-converters.ts" "$TARGET_DIR/src/${PACKAGE_NAME}-converters.ts"
mv "$TARGET_DIR/src/this-service.ts" "$TARGET_DIR/src/${PACKAGE_NAME}.ts"

# Output success message
echo "Linter package '$PACKAGE_NAME' created at '$TARGET_DIR'"
