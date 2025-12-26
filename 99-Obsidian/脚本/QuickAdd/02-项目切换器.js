module.exports = async (params) => {
    const { quickAddApi } = params;
    const { suggester, inputPrompt } = quickAddApi;
    
    try {
        // 查找项目文件夹
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
            new Notice("请先创建项目文件夹: 01 Projects");
            return;
        }
        
        // 获取项目列表
        const projects = projectsFolder.children
            .filter(file => file.extension === "md")
            .map(file => ({
                name: file.basename,
                file: file,
                mtime: file.stat.mtime
            }));
        
        // 按修改时间排序
        projects.sort((a, b) => b.mtime - a.mtime);
        
        const projectNames = projects.map(p => p.name);
        projectNames.push("➕ 创建新项目");
        
        const selected = await suggester(
            projectNames.map(name => name === "➕ 创建新项目" ? "➕ 创建新项目" : `📁 ${name}`),
            projectNames
        );
        
        if (!selected) return;
        
        if (selected === "➕ 创建新项目") {
            const projectName = await inputPrompt("新项目名称", "新项目");
            if (!projectName) return;
            
            // 创建项目文件
            const projectPath = projectsFolder.path + "/" + projectName + ".md";
            const content = `# ${projectName}\n\n创建于：${new Date().toLocaleDateString('zh-CN')}`;
            await app.vault.create(projectPath, content);
            
            new Notice(`✅ 已创建项目：${projectName}`);
            
            // 打开新项目
            const newFile = app.vault.getAbstractFileByPath(projectPath);
            if (newFile) {
                const leaf = app.workspace.getLeaf();
                await leaf.openFile(newFile);
            }
        } else {
            const project = projects.find(p => p.name === selected);
            if (project) {
                const leaf = app.workspace.getLeaf();
                await leaf.openFile(project.file);
                new Notice(`📂 切换到：${selected}`);
            }
        }
        
    } catch (error) {
        console.error("错误:", error);
        new Notice(`❌ 错误: ${error.message}`);
    }
};