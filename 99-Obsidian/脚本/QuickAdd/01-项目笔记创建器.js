module.exports = async (params) => {
    const { quickAddApi } = params;
    const { inputPrompt, suggester } = quickAddApi;
    
    console.log("=== 项目笔记创建器启动 ===");
    
    try {
        // 1. 获取项目名称
        let projectName = "";
        const activeFile = app.workspace.getActiveFile();
        
        if (activeFile) {
            console.log("当前文件:", activeFile.path);
            
            // 检查是否在 40 - Obsidian/01 Projects/ 或直接 01 Projects/
            if (activeFile.path.includes("01 Projects/")) {
                // 提取项目名
                const pathParts = activeFile.path.split("/");
                for (let i = 0; i < pathParts.length; i++) {
                    if (pathParts[i] === "01 Projects" && i + 1 < pathParts.length) {
                        projectName = pathParts[i + 1].replace(/\.md$/, "");
                        break;
                    }
                }
                console.log("检测到项目:", projectName);
            }
        }
        
        // 如果没检测到项目，让用户选择或创建
        if (!projectName) {
            // 查找项目文件夹（尝试不同路径）
            const projectPaths = [
                "40 - Obsidian/01 Projects",
                "01 Projects"
            ];
            
            let projectsFolder = null;
            for (const path of projectPaths) {
                projectsFolder = app.vault.getAbstractFileByPath(path);
                if (projectsFolder) {
                    console.log("找到项目文件夹:", path);
                    break;
                }
            }
            
            if (!projectsFolder || !projectsFolder.children) {
                new Notice("❌ 请先创建项目文件夹: 01 Projects");
                return;
            }
            
            const projects = projectsFolder.children
                .filter(file => file.extension === "md")
                .map(file => file.basename);
            
            if (projects.length === 0) {
                projectName = await inputPrompt("请输入项目名称", "新项目");
                // 创建新项目文件（在正确的路径）
                const projectPath = projectsFolder.path + "/" + projectName + ".md";
                const projectContent = `# ${projectName}\n\n> 创建时间：${new Date().toLocaleString()}`;
                await app.vault.create(projectPath, projectContent);
                new Notice(`✅ 已创建项目：${projectName}`);
            } else {
                projects.push("➕ 创建新项目");
                const selected = await suggester(
                    projects.map(p => p === "➕ 创建新项目" ? "➕ 创建新项目" : `📁 ${p}`),
                    projects
                );
                
                if (!selected) return;
                
                if (selected === "➕ 创建新项目") {
                    projectName = await inputPrompt("请输入新项目名称", "新项目");
                    const projectPath = projectsFolder.path + "/" + projectName + ".md";
                    const projectContent = `# ${projectName}\n\n> 创建时间：${new Date().toLocaleString()}`;
                    await app.vault.create(projectPath, projectContent);
                    new Notice(`✅ 已创建项目：${projectName}`);
                } else {
                    projectName = selected;
                }
            }
        }
        
        console.log("最终项目名称:", projectName);
        
        // 2. 查找模板文件夹
        const templatePaths = [
            "40 - Obsidian/模板",
            "模板"
        ];
        
        let templatesFolder = null;
        for (const path of templatePaths) {
            templatesFolder = app.vault.getAbstractFileByPath(path);
            if (templatesFolder) {
                console.log("找到模板文件夹:", path);
                break;
            }
        }
        
        if (!templatesFolder || !templatesFolder.children) {
            new Notice("❌ 未找到模板文件夹");
            return;
        }
        
        // 3. 列出所有模板文件
        const templateFiles = templatesFolder.children
            .filter(file => {
                const name = file.name.toLowerCase();
                return name.endsWith(".md") || name.endsWith(".eta") || name.includes("模板");
            })
            .map(file => ({
                name: file.name,
                displayName: file.name.replace(/\..+$/, "").replace(/^zt-/, ""),
                file: file
            }));
        
        console.log("找到模板文件:", templateFiles.map(t => t.name));
        
        if (templateFiles.length === 0) {
            new Notice("❌ 没有找到模板文件");
            return;
        }
        
        // 4. 选择模板
        const selectedTemplate = await suggester(
            templateFiles.map(t => t.displayName),
            templateFiles
        );
        
        if (!selectedTemplate) return;
        
        console.log("选择的模板:", selectedTemplate.name);
        
        // 5. 输入文件名
        const defaultName = selectedTemplate.displayName + "-" + 
            new Date().toISOString().replace(/[:.]/g, "-").split("T")[0];
        const fileName = await inputPrompt("请输入文件名（不带扩展名）", defaultName);
        
        if (!fileName || fileName.trim() === "") {
            new Notice("❌ 文件名不能为空");
            return;
        }
        
        // 6. 读取模板内容
        const templateContent = await app.vault.read(selectedTemplate.file);
        console.log("模板内容长度:", templateContent.length);
        
        // 7. 创建输出文件夹
        const outputPaths = [
            "40 - Obsidian/03 Outputs",
            "03 Outputs"
        ];
        
        let outputBase = "";
        for (const path of outputPaths) {
            const folder = app.vault.getAbstractFileByPath(path);
            if (folder) {
                outputBase = path;
                console.log("找到输出文件夹:", path);
                break;
            }
        }
        
        if (!outputBase) {
            // 创建默认输出文件夹
            outputBase = "03 Outputs";
            await app.vault.createFolder(outputBase).catch(() => {});
        }
        
        const projectFolder = `${outputBase}/${projectName}`;
        const targetFolder = `${projectFolder}/笔记`;
        
        // 创建文件夹
        await app.vault.createFolder(projectFolder).catch(() => {});
        await app.vault.createFolder(targetFolder).catch(() => {});
        
        console.log("目标文件夹:", targetFolder);
        
        // 8. 替换模板变量
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toLocaleTimeString('zh-CN');
        
        let processedContent = templateContent
            .replace(/\{\{date\}\}/gi, dateStr)
            .replace(/\{\{time\}\}/gi, timeStr)
            .replace(/\{\{datetime\}\}/gi, now.toLocaleString('zh-CN'))
            .replace(/\{\{project\}\}/gi, projectName)
            .replace(/\{\{title\}\}/gi, fileName);
        
        // 9. 创建新文件
        const fullPath = `${targetFolder}/${fileName}.md`;
        console.log("创建文件:", fullPath);
        
        const newFile = await app.vault.create(fullPath, processedContent);
        
        // 10. 打开文件
        const leaf = app.workspace.getLeaf();
        await leaf.openFile(newFile);
        
        new Notice(`✅ 已创建: ${fileName}.md\n📁 位置: ${targetFolder}`);
        
    } catch (error) {
        console.error("错误详情:", error);
        new Notice(`❌ 错误: ${error.message}`);
    }
};