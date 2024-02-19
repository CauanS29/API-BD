import { ObjectId } from "mongodb";


export async function getUserController(req: any, res: any) {
  try {
    const { db } = req.app;

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'User ID is required!' });
    }

    const result = await db.collection('users').findOne({
      _id: new ObjectId(id)
    });

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: " User retrieved",
      user: result
    });

  }
  catch(error) {
    res.status(500).json({ error: error.toString() });
  }
}