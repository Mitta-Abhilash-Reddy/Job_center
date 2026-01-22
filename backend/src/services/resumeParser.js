const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const mockParsed = {
  skills: ['javascript', 'node', 'express'],
  education: ['BSc Computer Science'],
  projects: ['Portfolio API'],
  experience: ['Built REST APIs'],
  summary: 'Experienced backend developer.',
  yearsExperience: 3,
};

const parseResume = async (filePath, originalName) => {
  const useApyhub = (process.env.USE_APYHUB || 'true').toLowerCase() === 'true';
  const apiKey = process.env.APYHUB_API_KEY;
  const endpoint = process.env.APYHUB_ENDPOINT || 'https://api.apyhub.com/processor/resume/parser';

  if (!useApyhub || !apiKey) {
    return mockParsed;
  }

  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath), { filename: originalName });

    const { data } = await axios.post(endpoint, form, {
      headers: {
        ...form.getHeaders(),
        'apy-token': apiKey,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    return data?.data || mockParsed;
  } catch (err) {
    console.error('ApyHub parse failed, returning mock data', err.message);
    return mockParsed;
  }
};

module.exports = { parseResume };


