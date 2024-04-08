import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('licenses')
export class LicensesController {
    constructor(private licensesService: LicensesService) { }

    @Get()
    getAll() {
        return this.licensesService.getAll();
    }

    @UseGuards(AuthGuard)
    @Get('my')
    getMyLicenses(@Request() req) {
        return this.licensesService.getByOwner(req.user.sub);
    }
}
