import './static.server'; // Serve Static Assets
import { Classy } from '../framework/index.server'
import { IgdbSearchService } from './service/igdb-search-service.server';
import { BrashShmoesModel } from './model/index.shared';

Classy(BrashShmoesModel).Services({
    igdb : IgdbSearchService
});