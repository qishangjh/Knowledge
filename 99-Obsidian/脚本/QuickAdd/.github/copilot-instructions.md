# QuickAdd Scripts - AI Coding Guide

## 项目概述
This is an Obsidian QuickAdd plugin script collection for managing projects, scraping metadata, and automating note creation. All scripts are CommonJS modules that export async functions receiving `params` with Obsidian's `app` object and QuickAdd API.

## Core Architecture

### Module Pattern
All scripts follow this CommonJS export pattern:
```javascript
module.exports = async (params) => {
  const { quickAddApi } = params;
  const { suggester, inputPrompt } = quickAddApi;
  // script logic using app.vault, app.workspace, etc.
}
```

### Key API Objects
- **app.vault**: File operations (read, write, create files/folders, getAbstractFileByPath)
- **app.workspace**: Active file management, workspace state
- **quickAddApi**: `suggester()` for user selection UI, `inputPrompt()` for text input
- **Notice**: UI notifications with message and timeout params

## Project Structure & Conventions

### Vault Path Fallbacks
Scripts search for folders in two possible locations - always check both:
```javascript
const paths = ["40 - Obsidian/01 Projects", "01 Projects"];
let folder = null;
for (const path of paths) {
  folder = app.vault.getAbstractFileByPath(path);
  if (folder) break;
}
```

### Folder Organization
- `01 Projects`: Project documents (.md files)
- `03 Outputs`: Generated subfolder structure per project
- `模板` (Templates): Template files for content generation

### Standard Subfolder Structure
When initializing project structure (see `03-初始化项目结构.js`), create:
文献笔记, 写作草稿, 数据资料, 会议记录, 实验记录, 参考文献, 图片素材, 临时文件

## Key Patterns & Common Tasks

### 1. File Selection with Sorting
`02-项目切换器.js` shows the pattern for interactive selection:
```javascript
const projects = projectsFolder.children
  .filter(file => file.extension === "md")
  .map(file => ({ name: file.basename, file: file, mtime: file.stat.mtime }));
projects.sort((a, b) => b.mtime - a.mtime); // Sort by recent
const selected = await suggester(displayNames, projects);
```

### 2. File Path Manipulation
Extract project names from nested paths:
```javascript
const pathParts = activeFile.path.split("/");
for (let i = 0; i < pathParts.length; i++) {
  if (pathParts[i] === "01 Projects" && i + 1 < pathParts.length) {
    projectName = pathParts[i + 1].replace(/\.md$/, "");
    break;
  }
}
```

### 3. Web Scraping Pattern (Douban scripts)
- Use `request()` API with headers (Mozilla user agent required)
- Parse HTML with `DOMParser` and CSS selectors
- Extract metadata via `querySelector()` and `innerText`
- Regex patterns for field extraction (author, page count, rating)
- Return object assigned to `params.variables` for template use

### 4. Date Formatting
Use locale-specific formatting:
```javascript
const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const day = date.getDate().toString().padStart(2, "0");
// Results: "2025年12月12日" format for wiki links: ![[2025年12月12日#section]]
```

### 5. Error Handling
Always wrap in try-catch and provide user feedback:
```javascript
try {
  // logic
} catch (error) {
  console.error("错误:", error);
  new Notice(`❌ 错误: ${error.message}`);
}
```

## Script Purposes & Entry Points

| Script | Purpose | Inputs |
|--------|---------|--------|
| `01-项目笔记创建器.js` | Auto-create project notes from templates | Project selection, template selection |
| `02-项目切换器.js` | Open recent projects or create new ones | Suggester dropdown |
| `03-初始化项目结构.js` | Generate standard folder structure per project | Project selection |
| `bookfromdouban.js` | Scrape book metadata from Douban URL | Douban book URL |
| `moviefromdouban.js` | Scrape movie metadata from Douban URL | Douban movie URL |
| `DateUpdate.js` | Update homepage transclusions daily | Hardcoded file path |
| `AgendaDateUpdate.js` | Update agenda transclusions (Node.js version) | Hardcoded file path |
| `get_filename.js` | Helper: extract previous file content for template variables | Uses recent files |

## Important Notes

1. **Path Configuration**: Scripts like `DateUpdate.js` and `AgendaDateUpdate.js` require hardcoded file path customization - always check for comments marked "必须编辑"

2. **HTML Parsing Limitations**: Douban scripts use regex and CSS selectors; fragile if page structure changes. Test with actual URLs during modifications.

3. **Notification Timing**: `new Notice(msg, timeout)` - timeout in ms (e.g., 3000 = 3s)

4. **Variables Export Pattern**: Modified scripts pass data to templates via:
   ```javascript
   params.variables = { ...bookdata };
   ```

5. **Internationalization**: Strings use Chinese. English comments provided for legacy scripts.

## Testing & Debugging

- Use `console.log()` - visible in Obsidian console (Ctrl+Shift+I)
- Test file paths exist before operations
- Validate URL formats for scrapers before DOM parsing
- Check for null/undefined before property access (use optional chaining `?.`)

