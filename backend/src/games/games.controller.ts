import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';

import { GamesService } from './games.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) { }

    @Get()
    getAll() {
        return this.gamesService.getAll();
    }

    @UseGuards(AuthGuard)
    @Post(':gameId/buy')
    buy(@Request() req, @Param('gameId') gameId: string) {
        return this.gamesService.buy(gameId, req.user.sub);
    }
}
