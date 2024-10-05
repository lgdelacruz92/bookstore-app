// controllers/bookController.ts
import { Request, Response } from "express";
import Favorite from "../models/favorite";

const defaultLimit = 10;

export const getFavorites = async (req: Request, res: Response) => {
  try {
    // Extract query parameters for pagination and search
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || defaultLimit;
    const skip = (page - 1) * limit;
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: "missing userId" });
      return;
    }

    let filter = {};

    filter = { user_id: userId };
    const favorites = await Favorite.find(filter).skip(skip).limit(limit);
    const totalFavorites = await Favorite.countDocuments(filter); // Count total filtered books

    res.json({
      totalFavorites,
      totalPages: Math.ceil(totalFavorites / limit),
      currentPage: page,
      favorites,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to fetch favorite", message: `${error}` });
  }
};

export const createFavorite = async (req: Request, res: Response) => {
  try {
    const newFavorite = new Favorite(req.body);
    const savedFavorite = await newFavorite.save();
    res.status(201).json(savedFavorite);
  } catch (error) {
    res.status(400).json({
      error: "Unable to create favorite",
      message: JSON.stringify(error),
    });
  }
};

export const findFavoriteById = async (req: Request, res: Response) => {
  const { favoriteId } = req.params;
  try {
    const favorite = await Favorite.findById(favoriteId);
    res.json(favorite);
  } catch (err) {
    res
      .status(404)
      .json({ error: "Favorite not found", message: JSON.stringify(err) });
  }
};

export const updateFavorite = async (req: Request, res: Response) => {
  const { favoriteId, props } = req.body;
  try {
    const favorite = await Favorite.findByIdAndUpdate(favoriteId, props, {
      new: true,
    });
    res.json(favorite);
  } catch (err) {
    res.status(400).json({
      error: `Favorite ${favoriteId} update failed`,
      message: JSON.stringify(err),
    });
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  const { favoriteId } = req.params;
  try {
    await Favorite.findByIdAndDelete(favoriteId);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    res.status(400).json({
      error: `Favorite ${favoriteId} failed to delete`,
      message: JSON.stringify(err),
    });
  }
};
