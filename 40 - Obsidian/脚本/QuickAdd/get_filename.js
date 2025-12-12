// 项目笔记创建器
module.exports = async (params) => {
    const { quickAddApi: { inputPrompt, suggester, yesNoPrompt } } = params;
    
    // 1. 获取当前项目
    const activeFile = app.workspace.getActiveFile();
    let projectName = "";
    let isInProjectsFolder = false;
    
    // 检查当前文件是否在 01 Projects 文件夹中
    if (activeFile && activeFile.path.startsWith("01 Projects/")) {
        isInProjectsFolder = true;
        // 从路径提取项目名（不带.md）
        projectName = activeFile.basename;
    }
    
    // 2. 如果不在项目文件夹，需要选择项目
    if (!isInProjectsFolder) {
        // 获取所有项目
        const projectsFolder = app.vault.getAbstractFileByPath("01 Projects");
        if (!projectsFolder || !projectsFolder.children) {
            new Notice("❌ 项目文件夹不存在：01 Projects");
            return;
        }
        
        const projects = projectsFolder.children
            .filter(file => file.extension === "md")
            .map(file => file.basename);
        
        if (projects.length === 0) {
            projectName = await inputPrompt("无现有项目，请输入新项目名称", "新项目");
        } else {
            // 添加"新项目"选项
            const allOptions = [...projects, "➕ 创建新项目"];
            const selected = await suggester(
                (item) => item === "➕ 创建新项目" ? "➕ 创建新项目" : `📁 ${item}`,
                allOptions
            );
            
            if (!selected) return;
            
            if (selected === "➕ 创建新项目") {
                projectName = await inputPrompt("请输入新项目名称", "新项目");
                // 创建新项目文件
                const projectContent = `# ${projectName}\n\n> 创建时间：${moment().format("YYYY-MM-DD HH:mm")}\n\n## 项目概述\n\n## 目标\n\n## 时间线\n\n## 相关资源\n\n---\n\n## 🚀 快速笔记\n使用 \`Ctrl+Shift+N\` 创建项目相关笔记`;
                await app.vault.create(`01 Projects/${projectName}.md`, projectContent);
                new Notice(`✅ 已创建项目：${projectName}`);
            } else {
                projectName = selected;
            }
        }
    }
    
    // 3. 选择笔记类型
    const templateOptions = [
        // 文献管理
        { name: "📚 文献笔记", template: "zt-note.eta.md", folder: "文献笔记" },
        { name: "🔗 文献引用", template: "zt-cite.eta.md", folder: "文献引用" },
        { name: "📝 文献注释", template: "zt-annot.eta.md", folder: "文献注释" },
        
        // 学术写作
        { name: "📄 学术长文本", template: "学术长文本模板.md", folder: "写作草稿" },
        { name: "🎯 输出笔记", template: "输出笔记模板.md", folder: "思考笔记" },
        
        // 知识管理
        { name: "📋 项目文档", template: "项目模板.md", folder: "项目文档" },
        { name: "🔤 术语定义", template: "术语模板.md", folder: "术语库" },
        { name: "👨‍🎓 学者信息", template: "学者模板.md", folder: "学者信息" },
        { name: "🏛️ 机构信息", template: "机构模板.md", folder: "机构信息" },
        
        // 日常记录
        { name: "📅 每周周记", template: "每周周记模板.md", folder: "周记" },
        { name: "📖 每日日记", template: "每日日记模板.md", folder: "日记" },
        { name: "📚 豆瓣读书", template: "douban_book.md", folder: "读书笔记" }
    ];
    
    const selectedItem = await suggester(
        (item) => item.name,
        templateOptions
    );
    
    if (!selectedItem) return;
    
    // 4. 创建目标文件夹
    const outputRoot = "03 Outputs";
    const projectFolder = `${outputRoot}/${projectName}`;
    const targetFolder = `${projectFolder}/${selectedItem.folder}`;
    
    // 确保文件夹存在
    await app.vault.createFolder(projectFolder).catch(() => {});
    await app.vault.createFolder(targetFolder).catch(() => {});
    
    // 5. 生成文件名
    const now = moment();
    let defaultFileName = "";
    
    if (selectedItem.template.includes("每日日记")) {
        defaultFileName = now.format("YYYY-MM-DD");
    } else if (selectedItem.template.includes("每周周记")) {
        defaultFileName = now.format("YYYY-[W]WW");
    } else if (selectedItem.template.includes("douban")) {
        defaultFileName = `豆瓣-${now.format("YYYYMMDD")}`;
    } else {
        defaultFileName = `${selectedItem.folder}-${now.format("YYYYMMDD-HHmm")}`;
    }
    
    const fileName = await inputPrompt("请输入文件名", defaultFileName);
    if (!fileName) return;
    
    // 6. 读取并处理模板
    const templatePath = `模板/${selectedItem.template}`;
    const templateFile = app.vault.getAbstractFileByPath(templatePath);
    
    if (!templateFile) {
        new Notice(`❌ 模板文件不存在：${templatePath}`);
        return;
    }
    
    let templateContent = await app.vault.read(templateFile);
    
    // 7. 替换模板变量
    const variables = {
        date: now.format("YYYY-MM-DD"),
        time: now.format("HH:mm:ss"),
        datetime: now.format("YYYY-MM-DD HH:mm:ss"),
        year: now.format("YYYY"),
        month: now.format("MM"),
        day: now.format("DD"),
        title: fileName,
        project: projectName
    };
    
    // 通用变量替换
    for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, "gi");
        templateContent = templateContent.replace(regex, value);
    }
    
    // 项目链接
    templateContent = templateContent.replace(
        /\{\{project_link\}\}/gi, 
        `[[${projectName}]]`
    );
    
    // 8. 确保有frontmatter包含项目信息
    const frontmatterMatch = templateContent.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
        // 已有frontmatter，检查是否有project字段
        if (!frontmatterMatch[1].includes("project:")) {
            templateContent = templateContent.replace(
                "---\n",
                `---\nproject: "${projectName}"\n`
            );
        }
    } else {
        // 没有frontmatter，添加一个
        templateContent = `---
project: "${projectName}"
date: ${now.format("YYYY-MM-DD")}
type: ${selectedItem.folder}
source: ${selectedItem.template}
---

${templateContent}`;
    }
    
    // 9. 创建文件
    const fullPath = `${targetFolder}/${fileName}.md`;
    const newFile = await app.vault.create(fullPath, templateContent);
    
    // 10. 打开文件
    const leaf = app.workspace.getLeaf();
    await leaf.openFile(newFile);
    
    new Notice(`✅ 已创建：${fileName}\n📁 位置：${targetFolder}`);
};