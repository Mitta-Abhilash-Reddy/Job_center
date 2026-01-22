const calculateFitScore = (resumeSkills = [], jobSkills = []) => {
  const normalizedResume = resumeSkills.map((s) => s.toLowerCase());
  const normalizedJob = jobSkills.map((s) => s.toLowerCase());
  const matched = normalizedJob.filter((skill) => normalizedResume.includes(skill));
  const missing = normalizedJob.filter((skill) => !normalizedResume.includes(skill));
  const score = Math.round((matched.length / (normalizedJob.length || 1)) * 100);
  return { score, matchedSkills: matched, missingSkills: missing };
};

module.exports = { calculateFitScore };


