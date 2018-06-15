import axios from 'axios';

// TODO: error handling

class ProblemsService {
  static async getProblemsTypes() {
    return (await axios.get('/problems/types/')).data
      .map(type => ({ id: type.id, value: type.verbose_name }));
  }

  static async create(problem) {
    return axios
      .post('/problems/', problem);
  }
}

export default ProblemsService;
