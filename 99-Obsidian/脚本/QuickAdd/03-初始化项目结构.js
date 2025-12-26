module.exports = async (params) => {
    const { quickAddApi } = params;
    const { suggester } = quickAddApi;
    
    try {
        // 1. 选择项目
        const projectPaths = [
            "40 - Obsidian/01 Projects",
            "01 Projects"
        ];
        
        let projectsFolder = null;
        for (const path of projectPaths) {
            projectsFolder = app.vault.getAbstractFileByPath(path);
            if (projectsFolder) break;
        }
        
        if (!projectsFolder || !projectsFolder.children) {
            new Notice("没有找到项目文件夹");
            return;
        }
        
        const projects = projectsFolder.children
            .filter(file => file.extension === "md")
            .map(file => file.basename);
        
        if (projects.length === 0) {
            new Notice("没有找到项目文件");
            return;
        }
        
        const selectedProject = await suggester(
            projects.map(p => `📁 ${p}`),
            projects
        );
        
        if (!selectedProject) return;
        
        // 2. 创建文件夹结构
        const folders = [
            "文献笔记",
            "写作草稿",
            "数据资料",
            "会议记录",
            "实验记录",
            "参考文献",
            "图片素材",
            "临时文件"
        ];
        
        // 查找输出文件夹
        const outputPaths = [
            "40 - Obsidian/03 Outputs",
            "03 Outputs"
        ];
        
        let outputBase = "";
        for (const path of outputPaths) {
            const folder = app.vault.getAbstractFileByPath(path);
            if (folder) {
                outputBase = path;
                break;
            }
        }
        
        if (!outputBase) {
            outputBase = "03 Outputs";
            await app.vault.createFolder(outputBase).catch(() => {});
        }
        
        let createdCount = 0;
        for (const folder of folders) {
            const path = `${outputBase}/${selectedProject}/${folder}`;
            try {
                await app.vault.createFolder(path);
                createdCount++;
                console.log("创建文件夹:", path);
            } catch (e) {
                // 文件夹已存在
            }
        }
        
        new Notice(`✅ 为【${selectedProject}】创建了 ${createdCount} 个文件夹`);
        
    } catch (error) {
        console.error("错误:", error);
        new Notice(`❌ 错误: ${error.message}`);
    }
};