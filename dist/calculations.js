// 60道计算变式，清晰标注题族；每个指标10组数据，不冒充60个独立知识点。
const calcFamilies=['精确率计算','召回率计算','F1计算','准确率计算','抽检合格率','流程转化率'];
for(let k=0;k<6;k++)for(let j=0;j<10;j++){
 const tp=24+j*7,fp=9+j*2,fn=15+j*3,tn=90+j*11,n=120+j*20,bad=7+j*2,visits=200+j*40,orders=17+j*5;
 const vals=[tp/(tp+fp),tp/(tp+fn),2*tp/(2*tp+fp+fn),(tp+tn)/(tp+fp+fn+tn),(n-bad)/n,orders/visits];
 const formulas=[`${tp}/(${tp}+${fp})`,`${tp}/(${tp}+${fn})`,`2×${tp}/(2×${tp}+${fp}+${fn})`,`(${tp}+${tn})/(${tp}+${fp}+${fn}+${tn})`,`(${n}-${bad})/${n}`,`${orders}/${visits}`];
 const num=Number((vals[k]*100).toFixed(1));let distract=[num,Number((num-7.3).toFixed(1)),Number((num+4.6).toFixed(1)),Number((num-12.1).toFixed(1))];let rotate=(j+k)%4;let opts=distract.slice(rotate).concat(distract.slice(0,rotate)).map(x=>x.toFixed(1)+'%');
 const names=['投诉识别','垃圾邮件检测','缺陷检测','意图识别','异常预警','风险工单','订单分类','语音意图','图像筛选','文本审核'];
 const stem=k<4?`【计算变式】${names[j]}测试中，正类定义为目标事件，TP=${tp}、FP=${fp}、FN=${fn}、TN=${tn}。${['精确率','召回率','F1','准确率'][k]}约是多少（保留一位小数）？`:k===4?`【计算变式】抽检${n}条标注，${bad}条不合格。按条计算的合格率约为多少（保留一位小数）？`:`【计算变式】同一统计口径下，${visits}次有效咨询产生${orders}次成交。咨询到成交转化率约是多少（保留一位小数）？`;
 questions.push({id:`calc-${k}-${j}`,m:k<4?3:k===4?2:1,type:'单选',stem,options:opts,answer:[(4-rotate)%4],explain:`${calcFamilies[k]}：${formulas[k]}×100%≈${num.toFixed(1)}%。${['分母为预测正例数TP+FP，关注误报。','分母为真实正例数TP+FN，关注漏报。','F1使用调和平均，不能简单将精确率与召回率相加除以二。','准确率同时计算正确的正例与负例；不平衡时还应查看各类指标。','分母为实际抽检条数，不是全部生产条数。','分子分母必须来自可比较的同一口径，不能跨时间或人群混算。'][k]}`,tag:calcFamilies[k],difficulty:'应用',source:'原创计算变式',family:calcFamilies[k]});
}
questions.forEach(q=>{q.difficulty=q.difficulty||(q.id[0]==='q'?'基础':'进阶');q.tag=q.tag||(Number.isInteger(q.fact)?facts[q.fact][1]:modules[q.m][0]);q.source=q.source||'原创学习题';});
const referenceSources=[
{name:'国家职业技能标准（2021年版）查询入口',url:'https://www.osta.org.cn/api/sys/downloadFile/decrypt?fileName=4eNsZIOv3WFNDfbnldJHeA%2F2024%2F4%2F29%2F6761815658ea468cbc0caa8974357703.pdf',use:'职业能力框架；非本项目题目的官方出处'},
{name:'成都职业技术学院保存的2021版标准资料',url:'https://www.cdp.edu.cn/__local/F/32/90/C6CFE95FFD7768B1D16877F8668_28B50D3E_339D0.pdf',use:'辅助核对业务分析、智能训练、智能系统设计、培训指导模块'},
{name:'上海师大三级培训公开简章（2026-06-30）',url:'https://snuamcl.shnu.edu.cn/0a/38/c28160a854584/page.htm',use:'200题/90分钟的一个公开实例；不能泛化为全国统一题型'},
{name:'scikit-learn：常见陷阱与推荐实践',url:'https://scikit-learn.org/stable/common_pitfalls.html',use:'数据泄漏、训练测试隔离与预处理核对'},
{name:'scikit-learn：分类评估指标',url:'https://scikit-learn.org/stable/modules/model_evaluation.html',use:'Precision、Recall、F1与混淆矩阵公式'},
{name:'pandas：缺失值处理',url:'https://pandas.pydata.org/docs/user_guide/missing_data.html',use:'缺失识别与填补的技术参考'},
{name:'pandas：去重',url:'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html',use:'按指定字段去重的技术参考'}];
