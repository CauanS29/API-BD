export async function createUserController(req: any, res: any) {
    try {
      const { db } = req.app;
  
      const { 
      cpf, 
      nome, 
      data_nascimento 
      } = req.body;
  
      if (!cpf) {
        return res.status(400).json({ message: 'cpf is required' });
      }
  
      if (!nome) {
        return res.status(400).json({ message: 'nome is required' });
      }

      if (!data_nascimento) {
        return res.status(400).json({ message: 'data de nascimento is required' });
      }
  
      const userAlreadyExists = await db.collection('users').findOne({
       cpf
      });
  
      if (userAlreadyExists) {
        return res.status(400).json({ message: 'User already exists!' });
      }
  
      const result = await db.collection('users').insertOne({
        cpf,
        nome, 
        data_nascimento, 
      });
  
      if (result.acknowledged) {
        res.status(200).json({ message: 'User created!' });
      } else {
        throw new Error('User not created');
      }
  
    }
    catch(error) {
      res.status(500).json({ error: error.toString() });
    }
  }